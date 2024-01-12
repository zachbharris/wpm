import { query, mutation } from "./_generated/server";
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leaderboard").collect();
  },
});

export const createLeaderboardPosition = mutation({
  args: {
    name: v.string(),
    score: v.number(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("leaderboard", {
      name: args.name,
      score: args.score,
      duration: args.duration,
    })
  }
})
