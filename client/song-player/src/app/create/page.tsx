"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateSongMutation } from "@/lib/services/api";
import { useRouter } from "next/navigation";
import { genres } from "@/constants/genres";
import toast from "react-hot-toast";

const songSchema = z.object({
  title: z.string().nonempty("Title is required"),
  artist: z.string().nonempty("Artist is required"),
  album: z.string().nonempty("Album is required"),
  genre: z.string().nonempty("Genre is required"),
});

type FormFields = z.infer<typeof songSchema>;

const AddSongs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(songSchema),
  });

  const [createSong] = useCreateSongMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const res = await createSong(data);

    if (res) {
      toast.success("Successfully created");
      window.location.href = "/";
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm section-padding mx-auto"
    >
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          id="text"
          placeholder="Song Title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Artist
        </label>
        <input
          type="text"
          id="artist"
          placeholder="Artist Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          {...register("artist")}
        />
        {errors.artist && (
          <p className="text-red-500">{errors.artist.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Album
        </label>
        <input
          {...register("album")}
          type="text"
          id="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Album Name"
          required
        />
        {errors.album && <p className="text-red-500">{errors.album.message}</p>}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Genre
        </label>
        <select
          {...register("genre")}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {genres.map((genre) => {
            if (genre === "All") {
              return;
            }
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
      </div>
      <button
        type="submit"
        className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddSongs;
