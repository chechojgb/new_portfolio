import { Head, Link, usePage } from '@inertiajs/react';
import HeroSection from '@/components/heroSection';
import AboutMe from '@/components/aboutMe';
import TechStack from '@/components/techStack';
import ProjectsSection from '@/components/projectSection';
import { useState, useEffect } from 'react';
import GlobalStars from '@/components/GlobalStarts';

export default function Welcome() {
    const { auth } = usePage().props;
    
    return (
        <>
            <Head title="Mi portafolio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Contenedor global de estrellas */}
            <GlobalStars />
            
            <HeroSection/>
            <AboutMe/>
            <TechStack/>
            <ProjectsSection/>
        </>
    );
}

