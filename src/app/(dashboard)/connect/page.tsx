import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomConnectBox from "./components/custom-box";
import InstaConnectBox from "./components/insta-box";
import TwitterConnectBox from "./components/twitter-box";

const ConnectPage = () => {
  return (
    <section className="h-screen">
      <Tabs defaultValue="twitter">
        <TabsList>
          <TabsTrigger  value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="file-upload">Custom Data</TabsTrigger>
        </TabsList>
        <TabsContent value="twitter">
          <TwitterConnectBox />
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
