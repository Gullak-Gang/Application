import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFileProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

export function InputFile({ onChange, accept }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Select CSV File</Label>
      <Input 
        id="picture" 
        type="file" 
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}
