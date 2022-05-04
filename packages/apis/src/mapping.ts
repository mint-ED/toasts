// Import event classes
import {
  TransferSingle
} from "../generated/ToastContract/ToastContract";

// Import entity class
import { Toast } from "../generated/schema";

export function handleTransferSingle(event: TransferSingle): void {
  // Use id field from emitted event as unique id for the entity
  const id = event.params.id.toHex();

  // Create a new Entity with unique id
  const toast = new Toast(id);

  // Set Gravatar Entity fields
  toast.owner = event.params.to;
  toast.tokenId = event.params.id;
  toast.count = event.params.value;

  // Save entity to store
  toast.save();
}