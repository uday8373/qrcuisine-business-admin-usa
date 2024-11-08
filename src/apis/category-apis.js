import supabase from "@/configs/supabase";

export async function getAllCategories(page, pageSize, status, searchQuery) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    let query = supabase
      .from("menu_category")
      .select(`*`, {count: "exact"})
      .eq("restaurant_id", restaurantId)
      .order("status", {ascending: false})
      .order("priority", {ascending: true})
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);
    if (status !== "all") {
      query = query.eq("status", status === "true");
    }
    if (searchQuery) {
      query = query.ilike("category_name", `%${searchQuery}%`);
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

export async function getCategoryCounts() {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("menu_category")
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

export async function insertCategory(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("menu_category")
      .insert([
        {
          category_name: value.title,
          status: value.status,
          restaurant_id: restaurantId,
          icon: value.icon,
          priority: value.priority,
        },
      ])
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

export async function updateCategory(value) {
  try {
    const {data, error} = await supabase
      .from("menu_category")
      .update([
        {
          category_name: value.title,
          status: value.status,
          icon: value.icon,
          priority: value.priority,
        },
      ])
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

// Delete a category
export async function deleteCategory(value) {
  try {
    const {data, error} = await supabase
      .from("menu_category")
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
