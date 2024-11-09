import supabase from "@/configs/supabase";

export async function getAllSubCategories(page, pageSize, status, searchQuery) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    let query = supabase
      .from("sub_category")
      .select(`* , category_id(category_name,icon ,id)`, {count: "exact"})
      .eq("restaurant_id", restaurantId)
      .order("status", {ascending: false})
      .order("created_at", {ascending: false})

      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);
    if (status !== "all") {
      query = query.eq("status", status === "true");
    }
    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
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

export async function getSubCategoryCounts() {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("sub_category")
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

export async function insertSubCategory(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("sub_category")
      .insert([
        {
          title: value.title,
          status: value.status,
          restaurant_id: restaurantId,
          category_id: value.category_id,
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

export async function getAllParentCategorys() {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("menu_category")
      .select("category_name,id")
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

export async function updateSubCategory(value) {
  try {
    const {data, error} = await supabase
      .from("sub_category")
      .update([
        {title: value.title, status: value.status, category_id: value.category_id},
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
export async function deleteSUbCategory(value) {
  try {
    const {data, error} = await supabase
      .from("sub_category")
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
