import supabase from "@/configs/supabase";

export async function getAllSideAndOptions(activeTab, page, pageSize) {
  try {
    let tableNames = "";
    let selectQuery = "*";

    // Determine which tables to query based on the activeTab
    switch (activeTab) {
      case "food_sides":
        tableNames = "food_sides";
        selectQuery = "*,group_id(*)";
        break;
      case "additional_sides":
        tableNames = "additional_sides";
        selectQuery = "*,group_id(*)";
        break;
      case "food_quantity":
        tableNames = "food_quantity";
        selectQuery = "*,group_id(*)";
        break;
      case "quick_instructions":
        tableNames = "quick_instructions";
        selectQuery = "*,group_id(*)";
        break;
      case "temperature":
        tableNames = "temperature";
        selectQuery = "*";
        break;
      case "merged":
        tableNames = "side_group";
        selectQuery = `
        *,
        additional_sides(id, title,is_available,price,is_veg,quantity,is_free,group_id),
        food_quantity(id,group_id,title,price),
        quick_instructions(id,group_id,title,price),
        food_sides(id, title,is_available,price,is_veg,quantity,is_free,group_id)
      `;
        break;
      default:
        return {data: [], count: 0};
    }

    const {data, count, error} = await supabase
      .from(tableNames)
      .select(selectQuery, {count: "exact"})
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      console.error(`Error fetching data `, error);
      throw error;
    }

    return {data, count};
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function getAllSideGroup() {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase.from("side_group").select("*");
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getAllCountsAndData() {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    // Fetch data and counts from each table
    const {
      data: side_group_data,
      count: side_group_count,
      error: side_group_error,
    } = await supabase.from("side_group").select("*", {count: "exact"});

    const {
      data: additional_sides_data,
      count: additional_sides_count,
      error: additional_sides_error,
    } = await supabase.from("additional_sides").select("*", {count: "exact"});

    const {
      data: sides_data,
      count: sides_count,
      error: sides_error,
    } = await supabase.from("food_sides").select("*", {count: "exact"});

    const {
      data: quantity_data,
      count: quantity_count,
      error: quantity_error,
    } = await supabase.from("food_quantity").select("*", {count: "exact"});

    const {
      data: quick_instructions_data,
      count: quick_instructions_count,
      error: quick_instructions_error,
    } = await supabase.from("quick_instructions").select("*", {count: "exact"});

    const {
      data: temperature_data,
      count: temperature_count,
      error: temperature_error,
    } = await supabase.from("temperature").select("*", {count: "exact"});

    // Handle any potential errors
    if (
      side_group_error ||
      additional_sides_error ||
      sides_error ||
      quantity_error ||
      quick_instructions_error ||
      temperature_error
    ) {
      console.error("Error fetching counts or data:", {
        side_group_error,
        additional_sides_error,
        sides_error,
        quantity_error,
        quick_instructions_error,
        temperature_error,
      });
      return null;
    }

    // Return all counts and data in an object
    return {
      side_group: {count: side_group_count, data: side_group_data},
      additional_sides: {count: additional_sides_count, data: additional_sides_data},
      sides: {count: sides_count, data: sides_data},
      quantity: {count: quantity_count, data: quantity_data},
      quick_instructions: {
        count: quick_instructions_count,
        data: quick_instructions_data,
      },
      temperature: {count: temperature_count, data: temperature_data},
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}

export async function insertItems(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("food_sides")
      .insert([
        {
          price: value.price,
          is_available: value.is_available,
          is_veg: value.is_veg,
          quantity: value.quantity,
          is_free: value.is_free,
          group_id: value.group_id,
          title: value.title,
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
export async function insertGroup(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("side_group")
      .insert([
        {
          title: value.title,
          key_value: value.key_value,
          type: value.type,
          group_category: value.group_category,
          restaurant_id: restaurantId,
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
export async function insertAdditionalSidesItems(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("additional_sides")
      .insert([
        {
          price: value.price,
          is_available: value.is_available,
          is_veg: value.is_veg,
          quantity: value.quantity,
          is_free: value.is_free,
          group_id: value.group_id,
          title: value.title,
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
export async function insertQuantityItems(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("food_quantity")
      .insert([
        {
          title: value.title,
          is_available: value.is_available,
          group_id: value.group_id,
          price: value.price,
          is_free: value.is_free,
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
export async function insertInstructionsItems(value) {
  const restaurantId = localStorage.getItem("restaurants_id");
  try {
    const {data, error} = await supabase
      .from("quick_instructions")
      .insert([
        {
          title: value.title,
          is_available: value.is_available,
          group_id: value.group_id,
          price: value.price,
          is_free: value.is_free,
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

export async function updateInstructionsItems(value) {
  try {
    const {data, error} = await supabase
      .from("quick_instructions")
      .update([
        {
          title: value.title,
          is_available: value.is_available,
          group_id: value.group_id.id,
          price: value.price,
          is_free: value.is_free,
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

export async function updateSideItem(value) {
  try {
    const {data, error} = await supabase
      .from("food_sides")
      .update([
        {
          price: value.price,
          is_available: value.is_available,
          is_veg: value.is_veg,
          quantity: value.quantity,
          is_free: value.is_free,
          title: value.title,
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
export async function updateAdditionalSideItem(value) {
  try {
    const {data, error} = await supabase
      .from("additional_sides")
      .update([
        {
          price: value.price,
          is_available: value.is_available,
          is_veg: value.is_veg,
          quantity: value.quantity,
          is_free: value.is_free,
          title: value.title,
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
export async function updateQuantityItem(value) {
  try {
    const {data, error} = await supabase
      .from("food_quantity")
      .update([
        {
          title: value.title,
          is_available: value.is_available,
          group_id: value.group_id.id,
          price: value.price,
          is_free: value.is_free,
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
export async function updateTemperatureItems(value) {
  try {
    const {data, error} = await supabase
      .from("temperature")
      .update([
        {
          id: value.id,
          title: value.title,
          value: value.value,
          is_available: value.is_available,
          price: value.price,
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
export async function updateGroup(value) {
  const restaurantId = localStorage.getItem("restaurants_id");

  try {
    const {data, error} = await supabase
      .from("side_group")
      .update([
        {
          id: value.id,
          title: value.title,
          key_value: value.key_value,
          type: value.type,
          group_category: value.group_category,
          restaurant_id: restaurantId,
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

export const deleteSideItems = async (value, activeTab) => {
  try {
    const {data, error} = await supabase
      .from(activeTab)
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
};
export const deleteGroup = async (value) => {
  try {
    const {data, error} = await supabase
      .from("side_group")
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
};
