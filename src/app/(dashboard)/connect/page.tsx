import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/actions/twitter";
import CustomConnectBox from "./components/custom-box";
import InstaConnectBox from "./components/insta-box";
import TwitterConnectBox from "./components/twitter-box";

const ConnectPage = async () => {
  const twitterUser = await getCurrentUser();

  return (
    <section className="h-screen">
      <Tabs defaultValue="twitter">
        <TabsList className="w-full justify-between">
          <TabsTrigger className="flex-1 rounded-lg" value="twitter">
            Twitter
          </TabsTrigger>
          <TabsTrigger className="flex-1 rounded-lg" value="instagram">
            Instagram
          </TabsTrigger>
          <TabsTrigger className="flex-1 rounded-lg" value="custom">
            Custom Data
          </TabsTrigger>
        </TabsList>
        <TabsContent value="twitter">
          <TwitterConnectBox twitterUser={twitterUser} />
        </TabsContent>
        <TabsContent value="instagram">
          <InstaConnectBox />
        </TabsContent>
        <TabsContent value="custom">
          <CustomConnectBox />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ConnectPage;
