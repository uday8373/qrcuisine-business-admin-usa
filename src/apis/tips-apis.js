import supabase from "@/configs/supabase";
export async function getTipsApis() {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    let query = supabase
      .from("tips")
      .select(`*,restaurant_id(restaurant_name,logo,is_tip_percentage)`)
      .eq("restaurant_id", restaurantId)
      .order("amount", {ascending: false});

    const {data, error} = await query;
    if (error) {
      throw error;
    } else {
      return {data};
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function InsertTips(updatedData) {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    const {data, error} = await supabase
      .from("tips")
      .insert(updatedData)
      .select()
      .eq("restaurant_id", restaurantId);

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

export async function deleteTips(value) {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    const {data, error} = await supabase
      .from("tips")
      .delete()
      .eq("id", value.id)
      .eq("restaurant_id", restaurantId)
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

export async function updatedTips(id, updatedData) {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    const {data, error} = await supabase
      .from("tips")
      .update(updatedData)
      .eq("id", id)
      .eq("restaurant_id", restaurantId);

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}
export async function updatedTipsPercentage(newValue) {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    const {data, error} = await supabase
      .from("restaurants")
      .update({is_tip_percentage: newValue})
      .eq("id", restaurantId);

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}
