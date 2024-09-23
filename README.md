# Posts UI

This is a front end tech test for a company who would likely rather not appear on Google. Rhymes with Wrinkle.

This document contains instructions for running the app locally, and a discussion of the development process.

## Local setup

This has not changed from the starter code.

Install dependencies:

```bash
yarn install
```

## Automated tests

Run the tests with:

```bash
yarn test
```

## Manual testing

Run the dev server:

```bash
yarn dev
```

The dev server lives at http://localhost:5173 by default.

## Notes

I wrote hooks for the three queries first. The hooks use [React Query](https://tanstack.com/query/v5) for the heavy lifting, wrapping standard `fetch` requests (no Axios or anything). The hooks are tested with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### Fetching all the posts

No problem. Nothing much to talk about here.

### Searching the posts

In my mind "searching" is a job for the back end, but the JSON Placeholder API has no search functionality in their docs, so what we're doing here is "filtering" the fetched posts.

The `useSearchPosts` hook delegates the fetch of all posts to `usePosts`, then once fetched performs a fuzzy finding match on the post titles with a search query provided to the hook. The fuzzy finding comes from [a JS implementation of the FZF algorithm](https://fzf.netlify.app/docs/latest). It would be fairly easy to perform a RegEx match on the post titles, but the brief was specifically to display the "desired" posts, and the user does not always type in exactly what they desire!

### Deleting a post

React Query's `useMutation` hook wraps a `fetch` request with `{ method: 'DELETE' }`.

Since JSON Placeholder's API does not actually delete the posts, the UI is unchanged after hitting delete, but a message is logged to the browser console when the request completes successfully. Given a real API, I would want to invalidate the `usePosts` query and refetch the new list of posts after deletion, probably using React Query's [optimistic update](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates) feature to remove the deleted post from the UI immediately.

### Displaying a list of posts

The search input value is stored in state with an empty string `""` as the default. This value is passed to the `useSearchPosts` hook, and the resulting items from the FZF search are passed to a `<PostsList />` component.

`<PostsList />` maps over the FZF results to populate a `<ul />` with an `<li />` element for each result.

Because of the search data returned by the FZF matching, I'm able to highlight the search string in the displayed titles of the posts in the list. This involves mapping over the characters in the title string, and applying styling to those which the FZF algorithm found to be relevant. This would have led to screen readers announcing each character individually, so for accessibility I also render the unchanged title in a visually hidden element, and prevent the characters from being read aloud with `aria-hidden`.

Each displayed post includes a Delete button, the component for which encapsulates the `useDeletePost` mutation, called on the button's `onClick`. As discussed above, clicking this button doesn't affect the list in the UI, but logs to the browser console on success.

### Styles

It's awesome that you guys provided a wireframe for this test. Most front end tests include a "make it look nice" requirement but I'm an engineer, not a designer!

I used [Tailwind CSS](https://tailwindcss.com/) for styling. Tailwind still seems to be Marmite among front end developers, so I hope you don't hate it! It allowed me to quickly make this look "not terrible" without installing a whole component library. I did "borrow" a few pre-built Tailwind elements from other sources:

- [Stacked list](https://tailwindui.com/components/application-ui/lists/stacked-lists) from Tailwind UI
- [Button](https://daisyui.com/components/button/) and [Skeleton](https://daisyui.com/components/skeleton/) from Daisy UI

Oh and it has a Dark Mode so please do check that out.

I usually use Storybook (actually I prefer [Ladle](https://ladle.dev/)) and consider it essential for production UI development, but I didn't use it here because setting it up is a whole thing.
