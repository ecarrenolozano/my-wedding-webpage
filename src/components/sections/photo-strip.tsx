"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { siteConfig } from "@/config/site.config";

const marqueeImages = [0, 1, 4, 7, 8].map(
  (index) => siteConfig.event.photoStrip[index],
);

const marqueeLoop = [...marqueeImages, ...marqueeImages];

export function PhotoStrip() {
  const allImages = siteConfig.event.photoStrip;

  return (
    <section className="mx-auto w-full px-6">
      <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 md:hidden">
        {allImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative aspect-[4/5] overflow-hidden rounded-[0.8rem] bg-[#d9c8b8] shadow-[0_8px_18px_rgba(98,74,58,0.05)]"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="33vw"
              src={image.src}
            />
          </motion.div>
        ))}
      </div>

      <div className="group relative mx-auto hidden max-w-6xl overflow-hidden md:block">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          className="flex w-max gap-4"
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        >
          {marqueeLoop.map((image, index) => (
            <motion.div
              key={`${image.id}-${index}`}
              className="relative h-[220px] w-[176px] shrink-0 overflow-hidden rounded-[1rem] bg-[#d9c8b8] shadow-[0_10px_24px_rgba(98,74,58,0.06)] lg:h-[250px] lg:w-[200px]"
              transition={{ duration: 0.28, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Image
                alt={image.alt}
                className="object-cover transition duration-500 hover:scale-[1.03]"
                fill
                sizes="200px"
                src={image.src}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,rgba(246,239,231,1),rgba(246,239,231,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,rgba(246,239,231,1),rgba(246,239,231,0))]" />
      </div>
    </section>
  );
}
