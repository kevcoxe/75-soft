"use client"

import { motion } from "framer-motion"

export default function Skeleton({
  loading=false
} : {
  loading: boolean
}) {
  return (
    <motion.div
      key="loading Skeleton"
      animate={loading ? "loading" : "loaded"}
      variants={{
        loading: { opacity: 1 },
        loaded: { opacity: 0 },
      }}
    >
      { loading && (
        <div className="grid content-around h-screen grid-cols-1">
          <div className={`content-around flex flex-col gap-1`}>
            <h1 className="mb-16 text-center text-7xl">
              75 Soft
            </h1>
          </div>
        </div>
      )}
    </motion.div>
  )
}