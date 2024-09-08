import {
  deleteCookie,
  handleCookies,
  useGetUsers,
  UserAuthenticatedContext,
} from "./layout";
import { component$, useContext, useTask$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();
  const users = useGetUsers();
  const userAuthenticated = useContext(UserAuthenticatedContext);

  useTask$(({ track }) => {
    track(() => userAuthenticated.value);
  });

  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>

      <hr />

      {userAuthenticated.value ? (
        <button
          onClick$={async () => {
            try {
              await deleteCookie("user-session");
              userAuthenticated.value = "";
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Cerrar Sesión
        </button>
      ) : (
        <>
          {users.value.map((user) => (
            <div key={user.id}>
              {user.email}{" "}
              <button
                onClick$={async () => {
                  try {
                    await deleteCookie("user-session");

                    const delay = setTimeout(async () => {
                      await handleCookies(user.id);

                      clearTimeout(delay);
                      nav("/middleroute/");
                    }, 500);

                    userAuthenticated.value = user.id;
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Iniciar Sesión
              </button>
            </div>
          ))}
        </>
      )}

      <hr />

      <a href="/middleroute/">Middle route</a>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
