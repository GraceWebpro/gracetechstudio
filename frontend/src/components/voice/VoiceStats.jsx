import { motion } from "framer-motion";
import {
  Mic2,
  UserCircle2,
  Sparkles,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

export default function VoiceStats({
  totalVoices = 0,
  clonedVoices = 0,
  aiVoices = 0,
  totalPlays = 0,
}) {
  const stats = [
    {
      title: "Total Voices",
      value: totalVoices,
      icon: Mic2,
      color:
        "bg-primary/10 text-primary border-primary/20",
    },
    {
      title: "My Clones",
      value: clonedVoices,
      icon: UserCircle2,
      color:
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    {
      title: "AI Voices",
      value: aiVoices,
      icon: Sparkles,
      color:
        "bg-violet-500/10 text-violet-500 border-violet-500/20",
    },
    {
      title: "Total Plays",
      value: totalPlays.toLocaleString(),
      icon: PlayCircle,
      color:
        "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
  ];

  return (
    <div
      className="
        grid
        gap-5

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        mb-8
      "
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-3xl
              border
              border-border
              bg-surface
              p-6
              shadow-sm
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  border
                  flex
                  items-center
                  justify-center
                  ${stat.color}
                `}
              >
                <Icon size={24} />
              </div>
            </div>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-xs
                text-muted
              "
            >
              <TrendingUp
                size={14}
                className="text-emerald-500"
              />

              <span>Updated just now</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}