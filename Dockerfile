# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
WORKDIR /app
COPY package.json bun.lockb ./
RUN  bun install 


# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
WORKDIR /app
COPY --from=install ./app/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun prisma:generate
RUN bun prisma:migrate
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
WORKDIR /app
COPY --from=prerelease /app/node_modules node_modules
# COPY --from=prerelease /usr/src/app/index.ts ./
# COPY --from=prerelease /usr/src/app/package.json ./
COPY --from=prerelease /app/build ./

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "./build/index.js" ]