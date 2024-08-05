'use server'

import {signIn} from '@/../auth'
import {Pages} from '@/constants/Pages'
import {sql} from '@vercel/postgres'
import {AuthError} from 'next-auth'
import {revalidatePath} from 'next/cache'

export async function authenticateGoogle() {
  try {
    await signIn('google', { callbackUrl: `http://localhost:3000/${Pages.Studio}` })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

type Message = {
  id: string;
  text: string;
};


let messages: Message[] = [
  {
    id: crypto.randomUUID(),
    text: 'First Message',
  },
  {
    id: crypto.randomUUID(),
    text: 'Second Message',
  },
  {
    id: crypto.randomUUID(),
    text: 'Third Message',
  },
]

export const getMessages = async (): Promise<Message[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250))

  return Promise.resolve(messages)
}

export const createMessage = async (formData: FormData) => {
  'use server'

  await new Promise((resolve) => setTimeout(resolve, 250))

  const text = formData.get('text') as string

  messages.push({
                  id: crypto.randomUUID(),
                  text,
                })
}


export async function createSong(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  // const schema = z.object({
  //                           song: z.string().min(1),
  //                         });
  // const parse = schema.safeParse({
  //                                  song: formData.get("song"),
  //                                });
  //
  // if (!parse.success) {
  //   return { message: "Failed to create song" };
  // }
  //
  // const data = parse.data;

  try {
    await sql`INSERT INTO Songs (Artist, Title) VALUES (Bob, Alice);`

    revalidatePath('/')
    return { message: `Added song ${data.song}` }
  } catch (e) {
    return { message: 'Failed to create song' }
  }
}

// export async function deleteSong(
//   prevState: {
//     message: string;
//   },
//   formData: FormData,
// ) {
//   const schema = z.object({
//                             id: z.string().min(1),
//                             song: z.string().min(1),
//                           });
//   const data = schema.parse({
//                               id: formData.get("id"),
//                               song: formData.get("song"),
//                             });
//
//   try {
//     await sql`
//       DELETE FROM songs
//       WHERE id = ${data.id};
//     `;
//
//     revalidatePath("/");
//     return { message: `Deleted song ${data.song}` };
//   } catch (e) {
//     return { message: "Failed to delete song" };
//   }
// }
