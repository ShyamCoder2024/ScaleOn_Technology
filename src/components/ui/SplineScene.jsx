import { Suspense, lazy, memo } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export const SplineScene = memo(({ scene, className }) => {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="flex flex-col items-center gap-3">
                        <span className="loader"></span>
                        <span className="text-sm text-gray-500">Loading 3D Scene...</span>
                    </div>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
            />
        </Suspense>
    );
});

SplineScene.displayName = 'SplineScene';
