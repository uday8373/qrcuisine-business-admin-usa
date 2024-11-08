import React, {useState, useEffect} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
//   import {XMarkIcon} from "@heroicons/react/24/solid";

export default function UpdateTips({
  openAddTips,
  handleOpen,
  selectedTips,
  onConfirm,
  loading,
}) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (selectedTips) {
      setAmount(selectedTips.amount);
    }
  }, [selectedTips]);

  const handleSubmit = () => {
    const updatedData = {amount: parseFloat(amount)};
    onConfirm(updatedData);
  };

  return (
    <Dialog open={openAddTips} handler={handleOpen}>
      <DialogHeader>Update Tip Amount</DialogHeader>
      <DialogBody>
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSubmit}
          disabled={loading}>
          <span>{loading ? <Spinner /> : "Update"}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
