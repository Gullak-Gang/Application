import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <Spinner />
    </section>
  );
};

export default loading;
