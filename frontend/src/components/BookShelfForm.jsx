export default function Form() {

  return (
    <form className="flex flex-col justify-center max-w-lg mx-auto p-10 space-y-6">
      <div>
        <label htmlFor="full-name-small" className="mb-2 text-slate-900 dark:text-slate-50 font-bold text-sm inline-block">Book Name
        </label>
        <input type="text" id="full-name-small" placeholder="Habit Name"
          className="px-2.5 py-2 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
      </div>
      <div>
        <label htmlFor="full-name-small" className="mb-2 text-slate-900 dark:text-slate-50 font-bold text-sm inline-block">Book Description
        </label>
        <input type="text" id="full-name-small" placeholder="Habit Description"
          className="px-2.5 py-2 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
      </div>
      <button type="submit" className="btn btn-active btn-primary bg-blue-200">Submit</button>
    </form>
  );
}