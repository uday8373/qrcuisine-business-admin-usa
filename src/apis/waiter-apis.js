import supabase from "@/configs/supabase";

export async function getAllWaiters(page, pageSize, status, searchQuery) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    let query = supabase
      .from("waiters")
      .select(`*,orders(id,tip_amount,is_delivered)`, {count: "exact"})
      .eq("restaurant_id", restaurantId)
      .order("status", {ascending: false})
      .order("created_at", {ascending: false})
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);
    if (status !== "all") {
      query = query.eq("status", status === "true");
    }
    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const {data, count, error} = await query;
    if (error) {
      throw error;
    } else {
      return {data, count};
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getWaiterCounts() {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("waiters")
      .select("status")
      .eq("restaurant_id", restaurantId);

    if (error) {
      throw error;
    }

    const total = data.length;
    const available = data.filter((table) => table.status).length;
    const unAvailable = total - available;

    return {
      total,
      available,
      unAvailable,
    };
  } catch (error) {
    console.error("Error fetching counts:", error);
    throw error;
  }
}

export async function insertWaiter(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("waiters")
      .insert([{name: value.title, status: value.status, restaurant_id: restaurantId}])
      .select();
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

export async function updateWaiter(value) {
  try {
    const {data, error} = await supabase
      .from("waiters")
      .update([{name: value.title, status: value.status}])
      .eq("id", value.id)
      .select();
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

export async function deleteWaiter(value) {
  try {
    const {data, error} = await supabase
      .from("waiters")
      .delete()
      .eq("id", value.id)
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

export async function getOrdersforTips() {
  try {
    const {data, error} = await supabase.from("orders").select("*,waiter_id(*)");
    // .eq("waiter_id", waiter_id);
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
