'use client';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Balancer from 'react-wrap-balancer';
import { Button } from '../../components/shared/button';
import { Tree } from './tree';

const container = {
  hidden: { opacity: 0, y: 5 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 5 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const MotionButton = motion(Button);

export const Hero = () => {
  return (
    <>
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-700/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-green-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative isolate overflow-hidden"
      >
        <div className="mx-auto max-w-screen-2xl px-6 pt-10 pb-24 sm:pb-28 lg:flex lg:py-28 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-shrink-0 flex-col items-center lg:mx-0 lg:max-w-xl lg:items-start lg:pt-8">
            <motion.div
              variants={item}
              className="mt-24 flex sm:mt-32 md:justify-start lg:mt-16"
            >
              <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-600 hover:ring-gray-700">
                <span>
                  How this project was built.{' '}
                  <a
                    href="https://neon.tech"
                    className="focus-visible:ring-offset-200 rounded-sm text-green-900 ring-offset-2 ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-1200 sm:text-6xl lg:text-left"
            >
              <Balancer>Visualize Neon Database Branches</Balancer>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-md text-center text-lg leading-8 lg:text-left"
            >
              Create or connect a Neon project and easily see the hierarchy of
              its branches.
            </motion.p>

            <MotionButton
              variants={item}
              className="mt-10 flex  gap-x-6"
              onClick={() => signIn('neon')}
              size="large"
            >
              Continue with Neon
            </MotionButton>
          </div>
          <motion.div
            variants={item}
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32"
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Tree />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
