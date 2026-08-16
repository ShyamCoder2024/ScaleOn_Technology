import { Suspense, lazy, memo, useState, useEffect, useRef, useCallback } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

// Optimized loading skeleton with shimmer effect
const LoadingSkeleton = memo(() => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-12 h-12 rounded-full border-3 border-indigo-200 border-t-indigo-600 animate-spin" />
            <span className="text-sm text-gray-500 font-medium">Loading 3D Scene...</span>
        </div>
    </div>
));
LoadingSkeleton.displayName = 'LoadingSkeleton';

export const SplineScene = memo(({ scene, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const containerRef = useRef(null);
    // PERFORMANCE: keep a handle to the Spline runtime so we can pause the
    // WebGL render loop whenever the scene is off-screen or the tab is hidden.
    const splineAppRef = useRef(null);
    const isOnScreenRef = useRef(true);

    const syncPlayState = useCallback(() => {
        const app = splineAppRef.current;
        if (!app) return;
        const shouldRun = isOnScreenRef.current && !document.hidden;
        try {
            if (shouldRun && app.isStopped) {
                app.play();
            } else if (!shouldRun && !app.isStopped) {
                app.stop();
            }
        } catch {
            // Runtime not ready yet - the next visibility change will retry.
        }
    }, []);

    // Use Intersection Observer to defer loading until visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            { rootMargin: '100px', threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // PERFORMANCE: once loaded, stop the 3D runtime entirely while the hero is
    // scrolled out of view or the tab is in the background. This frees the GPU
    // and main thread for the rest of the page - the single biggest cost on
    // low-end devices. The scene resumes seamlessly when it re-enters view.
    useEffect(() => {
        if (!hasLoaded || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isOnScreenRef.current = entry.isIntersecting;
                syncPlayState();
            },
            { rootMargin: '100px' }
        );
        observer.observe(containerRef.current);

        document.addEventListener('visibilitychange', syncPlayState);

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', syncPlayState);
        };
    }, [hasLoaded, syncPlayState]);

    return (
        <div ref={containerRef} className={`${className} relative`} style={{ position: 'relative' }}>
            {!isVisible ? (
                <LoadingSkeleton />
            ) : (
                <Suspense fallback={<LoadingSkeleton />}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Spline
                            scene={scene}
                            className={className}
                            onLoad={(app) => {
                                splineAppRef.current = app;
                                setHasLoaded(true);
                            }}
                            style={{
                                opacity: hasLoaded ? 1 : 0,
                                transition: 'opacity 0.5s ease-out',
                                position: 'relative'
                            }}
                        />
                    </div>
                    {/* Show skeleton until fully loaded */}
                    {!hasLoaded && (
                        <div className="absolute inset-0">
                            <LoadingSkeleton />
                        </div>
                    )}
                </Suspense>
            )}
        </div>
    );
});

SplineScene.displayName = 'SplineScene';
