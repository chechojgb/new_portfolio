import { useEffect, useRef } from "react";

export default function GlobalStars() {
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastStarTimeRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createShootingStar = () => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            const startFromLeft = Math.random() > 0.5;
            const startFromTop = Math.random() > 0.5;
            
            const startX = startFromLeft ? -5 : 105;
            const startY = startFromTop ? Math.random() * 40 : Math.random() * 40 + 60;
            
            const targetX = startFromLeft ? 110 : -10;
            const targetY = startY + (Math.random() * 30 - 15);
            
            const distanceX = targetX - startX;
            const distanceY = targetY - startY;
            const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
            
            // 🔥 VARIEDAD DE COLORES Y ESTILOS
            const starTypes = [
                { 
                    color: 'linear-gradient(90deg, rgba(96, 165, 250, 0) 0%, #60a5fa 30%, #22d3ee 70%, rgba(34, 211, 238, 0) 100%)',
                    trail: 'linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.9) 20%, rgba(34, 211, 238, 0.6) 60%, transparent 100%)',
                    glow: '0 0 15px 3px rgba(96, 165, 250, 0.9), 0 0 25px 8px rgba(34, 211, 238, 0.5)'
                },
                {
                    color: 'linear-gradient(90deg, rgba(168, 85, 247, 0) 0%, #a855f7 25%, #ec4899 75%, rgba(236, 72, 153, 0) 100%)',
                    trail: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.8) 25%, rgba(236, 72, 153, 0.5) 65%, transparent 100%)',
                    glow: '0 0 12px 2px rgba(168, 85, 247, 0.8), 0 0 20px 6px rgba(236, 72, 153, 0.4)'
                },
                {
                    color: 'linear-gradient(90deg, rgba(34, 197, 94, 0) 0%, #22c55e 35%, #84cc16 65%, rgba(132, 204, 22, 0) 100%)',
                    trail: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.7) 30%, rgba(132, 204, 22, 0.4) 70%, transparent 100%)',
                    glow: '0 0 10px 2px rgba(34, 197, 94, 0.7), 0 0 18px 5px rgba(132, 204, 22, 0.3)'
                }
            ];
            
            const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
            
            // Aplicar estilos dinámicos
            star.style.background = starType.color;
            star.style.setProperty('--star-glow', starType.glow);
            star.style.setProperty('--trail-gradient', starType.trail);
            
            star.style.setProperty('--startX', startX);
            star.style.setProperty('--startY', startY);
            star.style.setProperty('--distanceX', distanceX);
            star.style.setProperty('--distanceY', distanceY);
            star.style.setProperty('--angle', angle);
            
            // 🔥 VARIEDAD EN VELOCIDAD Y TAMAÑO
            const speed = 0.8 + Math.random() * 0.6; // 0.8x a 1.4x velocidad
            const size = 2 + Math.random() * 3; // 2px a 5px de ancho
            const duration = 2 / speed; // Más rápido = menos duración
            
            star.style.animationDelay = `${Math.random() * 0.3}s`;
            star.style.animationDuration = `${duration}s`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // 🔥 EFECTO DE PARTÍCULAS SECUNDARIAS (ocasional)
            if (Math.random() > 0.7) {
                createSparkTrail(container, startX, startY, distanceX, distanceY, angle, starType);
            }
            
            container.appendChild(star);
            
            star.addEventListener('animationend', () => {
                if (star.parentNode) {
                    star.remove();
                }
            }, { once: true });
        };

        // 🔥 EFECTO DE CHISPAS SECUNDARIAS
        const createSparkTrail = (container, startX, startY, distanceX, distanceY, angle, starType) => {
            const sparkCount = 3 + Math.floor(Math.random() * 4); // 3-6 chispas
            
            for (let i = 0; i < sparkCount; i++) {
                setTimeout(() => {
                    const spark = document.createElement('div');
                    spark.className = 'spark-trail';
                    
                    const sparkDistance = 10 + Math.random() * 30;
                    const sparkAngle = angle + (Math.random() * 60 - 30); // Variación de ángulo
                    
                    spark.style.setProperty('--spark-startX', startX);
                    spark.style.setProperty('--spark-startY', startY);
                    spark.style.setProperty('--spark-distance', sparkDistance);
                    spark.style.setProperty('--spark-angle', sparkAngle);
                    spark.style.background = starType.color;
                    spark.style.animationDelay = `${i * 0.1}s`;
                    
                    container.appendChild(spark);
                    
                    spark.addEventListener('animationend', () => {
                        if (spark.parentNode) {
                            spark.remove();
                        }
                    }, { once: true });
                }, i * 80); // Espaciar las chispas
            }
        };

        const createStaticStars = () => {
            const starSizes = ['small', 'medium', 'large'];
            const shouldFloat = [true, false, true, false, true];
            
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < 32; i++) {
                const star = document.createElement('div');
                const size = starSizes[Math.floor(Math.random() * starSizes.length)];
                const floating = shouldFloat[Math.floor(Math.random() * shouldFloat.length)];
                
                star.className = `static-star ${size} ${floating ? 'float' : ''}`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 4}s`;
                star.style.animationDuration = `${4 + Math.random() * 3}s`;
                
                fragment.appendChild(star);
            }
            
            container.appendChild(fragment);
        };

        const animateStars = (currentTime) => {
            if (!lastStarTimeRef.current) lastStarTimeRef.current = currentTime;
            
            const elapsed = currentTime - lastStarTimeRef.current;
            
            if (elapsed > 2000) { // Cada 2 segundos (más espaciado para mejor visibilidad)
                createShootingStar();
                lastStarTimeRef.current = currentTime;
            }
            
            animationFrameRef.current = requestAnimationFrame(animateStars);
        };

        createStaticStars();
        animationFrameRef.current = requestAnimationFrame(animateStars);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            id="global-stars-container" 
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        ></div>
    );
}