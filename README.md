# effect-fs-access-on-vercel

This repository is for testing file system access in production on Vercel using the [`@effect/platform`](https://github.com/Effect-TS/effect/tree/main/packages/platform) and [`@effect/platform-node`](https://github.com/Effect-TS/effect/tree/main/packages/platform-node) packages.

## Purpose

The goal is to determine how file system reads behave in different scenarios on Vercel, especially for Open Graph image generation.

## Observations

- **File system access works** for all Open Graph image generation routes **except** those that are dynamically generated at runtime at `/effect/[id]/opengraph-image.tsx`.
- For these dynamic routes, file system reads fail due to Vercel's serverless environment constraints (assumingly).

## Usage

This repo contains minimal code to reproduce and investigate these behaviors.

## Related Packages

- [`@effect/platform`](https://github.com/Effect-TS/effect/tree/main/packages/platform)
- [`@effect/platform-node`](https://github.com/Effect-TS/effect/tree/main/packages/platform-node)