import { Code } from "../components/Code";

export default function TrackRack() {
    return (
        <>
            <h2>What is TrackRack?</h2>
            <p>
                As someone who makes music with friends, I always find myself
                jumping through hoops trying to send audio files. They're often
                too big, or I end up losing them because they're unorganized. I
                wanted a way to organize the files related to my songs in a
                format that made sense and share them with whoever I wanted.
                This is what motivated me to create TrackRack.
            </p>
            <p>
                TrackRack is, in its most basic form, a file storage website.
                Files are stored in a format familiar to musicians: tracks.
                Tracks contain all the elements of a song—the stems, album
                cover, demos, etc. Tracks are stored in Projects, which can be
                albums, EPs, Mixtapes, etc. Storing audio files this way
                facilitates the progression and improvement of a song.
            </p>
            <p>
                To enhance this improvement aspect, invited users can provide
                their feedback through comments. With comments, discussions
                about the music can be centralized, removing the necessity of
                using third-party chat apps to communicate.
            </p>
            <p>
                Overall, TrackRack gives musicians a more ergonomic way to
                create music. It allows them to streamline their work and
                improve it.
            </p>

            <img src="/trackrack-2.png" className="w-full h-auto" />
            <p className="italic">
                The 'Track' page. Notice how files are separated by type
            </p>

            <h2>How I created TrackRack</h2>
            <p>
                TrackRack is a <a href="https://nextjs.org/">NextJS 14</a> app
                created with the <a href="https://create.t3.gg/">T3 Stack</a>.
                The frontend and backend are both in TypeScript, using{" "}
                <a href="https://trpc.io/"> TRPC </a> to interact from front-end
                to back-end. It uses
                <a href="https://www.prisma.io/"> Prisma </a> as an ORM and
                <a href="https://uploadthing.com/"> UploadThing </a> to store
                files.
            </p>

            <h2>NextJS 14</h2>
            <p>
                I've enjoyed using NextJS 14, although I've faced a few
                challenges with the technology. I'm very familiar with React,
                but NextJS 14 introduced a feature known as server components.
                React Server Components (RSCs) are essentially server-rendered
                React components. This allows your app to skip a trip from the
                server to the client and send the HTML instead. This can be very
                useful for more static webpages. It both speeds up load times
                and can simplify the developer experience. RSCs allow the use of
                async functions inside components because they are only rendered
                once. This eliminates the need to hold async values in a state
                or use libraries like React Query.
            </p>
            <Code
                code={`async function getPosts() {
  // Fetch posts
}

async function ServerRenderedComponent() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`}
            />

            <p>
                The downsides to NextJS 14 come when you need your website to
                perform more dynamic rendering. When you need reactivity, you
                can use NextJS client-rendered components. These behave just
                like traditional React components, although you have to add the
                `"use client"` directive to client-component files. This seems
                simple enough, but there is a hard rule you need to keep track
                of.
            </p>
            <p>
                Server components cannot live within a client component. Once
                you make a client component, all children must be client
                components as well. There is a workaround to this, and it's to
                pass in a server component as a prop/child to a client
                component. However, doing this a lot can ruin your code's
                readability and quickly increase complexity. Keeping track of
                this rule isn't hard, but deciding whether to use a server
                component or a client component can become confusing, especially
                when requirements keep changing, and server components need to
                be made into client components or vice-versa.
            </p>
            <p>
                Overall, my experience with NextJS 14 was good, but I ran into a
                few problems along the way.
            </p>

            <p>
                <a href="https://trpc.io/">
                    TypeScript Remote Control Procedure (TRPC)
                </a>{" "}
                is a TypeScript library used to provide a type-safe API between
                the TypeScript front-end and back-end. The T3 stack sets up
                TRPC, which works by creating routes where you can define your
                backend functions. Here's an example:
            </p>
            <Code
                code={`export const projectsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        projectUrl: z.string().optional(),
        id: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.project.findFirst({
        include: {
          // Include related entities
        },
      });
    }),
  changePrivacy: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        isPrivate: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.projectId },
        data: { isPrivate: input.isPrivate },
      });
    }),
});`}
            />

            <p>
                This example shows the router for the `projects` entity. We
                first define the router with the `createTRPCRouter` function. We
                then define procedures such as `get` or `changePrivacy`. Each
                procedure that accepts parameters must be validated through a
                zod schema. `.query` is where the logic for the procedure is
                defined.
            </p>

            <p>To use a procedure is as simple as:</p>
            <Code
                code={`const project = await api.projects.get.query({
  projectUrl: params.project,
});`}
            />

            <h2>Moving Forward</h2>

            <p>
                As you may have noticed, I didn't deploy TrackRack. The truth
                is, file storage is expensive. I may rewrite this app in the
                future to optimize file storage. I currently rely on
                UploadThing, which is an Amazon S3 wrapper for NextJS. I'll
                probably want more control over file storage in the future,
                which will necessitate migrating technologies. I'll probably
                also decide to test TrackRack with my friends, then release it
                gradually.
            </p>
            <p>
                Overall, TrackRack has been a fun passion project to work on. It
                was my first big full-stack app, and it challenged me to learn
                all these new technologies.
            </p>
        </>
    );
}
