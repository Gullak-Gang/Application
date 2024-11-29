const BASE_URL = "http://localhost:8080/api/v1/namespaces/system/kv";

/**
 * Add a key-value pair to the store.
 * @param key - The key to add.
 * @param value - The value to associate with the key.
 * @returns A promise that resolves to void.
 */
export async function addKeyValue(key: string, value: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${key}`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
    },
    body: value,
  });
  if (response.ok) {
    console.log(`Key "${key}" added successfully.`);
  } else {
    console.error(`Failed to add key "${key}".`);
  }
}

/**
 * Get the value for a key from the store.
 * @param key - The key to retrieve.
 * @returns A promise that resolves to the value associated with the key, or `null` if not found.
 */
export async function getKeyValue(key: string): Promise<string | null> {
  const response = await fetch(`${BASE_URL}/${key}`);
  if (response.ok) {
    const data: { type: string; value: string } = await response.json();
    console.log("Retrieved value:", data);
    return data.value;
  }
  if (response.status === 404) {
    const errorData: {
      message: string;
      logref: null;
      path: null;
      _links: { self: { href: string } };
      _embedded: Record<string, unknown>;
    } = await response.json();
    console.warn(errorData.message);
    return null;
  }
  console.error(`Failed to get key "${key}" with status:`, response.status);
  return null;
}

/**
 * Delete a key-value pair from the store.
 * @param key - The key to delete.
 * @returns A promise that resolves to `true` if the key was deleted, `false` if not found.
 */
export async function deleteKeyValue(key: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/${key}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error(`Failed to delete key "${key}".`);
    return false;
  }
  const result = await response.text();
  const deleted = result === "true";
  console.log(`Key "${key}" deleted:`, deleted);
  return deleted;
}
