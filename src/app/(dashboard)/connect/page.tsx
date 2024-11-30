import { getAuthUrl } from "@/actions/twitter";
import TwitterConnect from "./components/twitter-button";

const ConnectPage = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1>Connect</h1>
      {/* {token ? ( */}
      {/* <p>Token: {JSON.stringify(token)}</p> */}
      {/* ) : ( */}
      <form action={getAuthUrl}>
        <TwitterConnect />
      </form>
      {/* )} */}
    </section>
  );
}

export default ConnectPage;