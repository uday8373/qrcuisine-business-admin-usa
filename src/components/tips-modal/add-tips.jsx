import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";

export default function AddTips({open, handleOpen, onAddTips, loading}) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const restaurantId = localStorage.getItem("restaurants_id");

  const handleSubmit = async () => {
    // Input validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid tip amount.");
      return;
    }
    if (!restaurantId) {
      console.error("Restaurant ID not found in localStorage.");
      return;
    }

    const newTipsData = {
      amount: parseFloat(amount),
      restaurant_id: restaurantId,
    };

    try {
      await onAddTips(newTipsData);
      setAmount("");
      setError(null); // Clear error on success
      handleOpen();
    } catch (error) {
      console.error("Failed to add tip:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Tip</DialogHeader>
        <DialogBody>
          <Input
            label="Tips"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(null); // Clear error on input change
            }}
            required
            error={Boolean(error)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
