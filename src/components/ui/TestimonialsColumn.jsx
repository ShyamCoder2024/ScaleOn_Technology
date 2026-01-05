"use client";
import React, { memo } from "react";

export const TestimonialsColumn = memo((props) => {
    const { className, testimonials, duration } = props;

    return (
        <div className={className}>
            <div
                className="flex flex-col gap-6 pb-6"
                style={{
                    animation: `scrollUp ${duration || 10}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-10 rounded-3xl border border-gray-100 bg-white shadow-lg shadow-blue-900/5 max-w-xs w-full" key={i}>
                                    <div className="text-gray-700 leading-relaxed">"{text}"</div>
                                    <div className="flex items-center gap-3 mt-5">
                                        <div className="flex flex-col">
                                            <div className="font-montserrat font-bold tracking-tight leading-5 text-[#101418]">{name}</div>
                                            <div className="leading-5 opacity-60 tracking-tight text-sm text-[#2563EB]">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </div>
        </div>
    );
});

TestimonialsColumn.displayName = 'TestimonialsColumn';
