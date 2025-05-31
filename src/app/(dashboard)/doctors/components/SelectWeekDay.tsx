import { SelectContent, SelectItem } from "@/components/ui/select";

export function SelectWeekDay() {
  return (
    <SelectContent>
      <SelectItem value="0">Domingo</SelectItem>
      <SelectItem value="1">Segunda</SelectItem>
      <SelectItem value="2">Terça</SelectItem>
      <SelectItem value="3">Quarta</SelectItem>
      <SelectItem value="4">Quinta</SelectItem>
      <SelectItem value="5">Sexta</SelectItem>
      <SelectItem value="6">Sábado</SelectItem>
    </SelectContent>
  );
}
