// "use client";

// import { Customer } from "@/types/customer";
// import { MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface TableActionProps {
//   customer: Customer;
// }

// export default function TableAction({ customer }: TableActionProps) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuItem
//           onClick={() => navigator.clipboard.writeText(customer.customerId.toString())}
//         >
//           Copy customer ID
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>View customer</DropdownMenuItem>
//         <DropdownMenuItem>Edit customer</DropdownMenuItem>
//         <DropdownMenuItem className="text-red-600">Delete customer</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// ------------------------ 2222222222222222222222 --------------------------
"use client";

import React, { useState } from "react";
import { Customer } from "@/types/customer";
import { MoreHorizontal, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} from "@/redux/services/customersApi";
import { toast } from "sonner";

interface TableActionProps {
  customer: Customer;
}

export default function TableAction({ customer }: TableActionProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Edit form state — only editable fields from backend UpdateCustomerDto
  const [formData, setFormData] = useState({
    name: customer.name ?? "",
    email: customer.email ?? "",
    phone: customer.phone ?? "",
  });

  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();
  const [updateCustomer, { isLoading: isUpdating }] =
    useUpdateCustomerMutation();

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(customer.customerId));
    toast.success("Customer ID copied to clipboard");
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(String(customer.customerId)).unwrap();
      toast.success("Customer deleted successfully");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete customer");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateCustomer({
        id: String(customer.customerId),
        name: formData.name || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
      }).unwrap();
      toast.success("Customer updated successfully");
      setEditDialogOpen(false);
    } catch {
      toast.error("Failed to update customer");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Dropdown ── */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleCopyId}>
            Copy Customer ID
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Customer
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Customer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ── View Dialog ── */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <span className="text-muted-foreground font-medium">
                Customer ID
              </span>
              <span>#{String(customer.customerId)}</span>

              <span className="text-muted-foreground font-medium">User ID</span>
              <span>#{String(customer.userId)}</span>

              <span className="text-muted-foreground font-medium">Name</span>
              <span>{customer.name ?? "—"}</span>

              <span className="text-muted-foreground font-medium">Email</span>
              <span>{customer.email ?? "—"}</span>

              <span className="text-muted-foreground font-medium">Phone</span>
              <span>{customer.phone}</span>

              <span className="text-muted-foreground font-medium">
                Last Message
              </span>
              <span className="truncate">
                {customer.lastMessage ?? "No messages"}
              </span>

              <span className="text-muted-foreground font-medium">
                Unread Messages
              </span>
              <span>{customer.unreadMessageCount}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Customer name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="customer@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+880XXXXXXXXXX"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>
                {customer.name ?? `Customer #${customer.customerId}`}
              </strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
