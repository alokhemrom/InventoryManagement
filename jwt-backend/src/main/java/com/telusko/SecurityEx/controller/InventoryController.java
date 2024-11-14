package com.telusko.SecurityEx.controller;

import org.springframework.web.bind.annotation.*;

import com.telusko.SecurityEx.model.Inventory;
import com.telusko.SecurityEx.service.InventoryService;

import java.util.List;

@RestController
@RequestMapping("/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/{companyId}")
    public Inventory addInventory(@PathVariable Long companyId, @RequestBody Inventory inventory) {
        return inventoryService.addInventory(companyId, inventory);
    }

    @PutMapping("/{inventoryId}")
    public Inventory updateInventory(@PathVariable Long inventoryId, @RequestBody Inventory updatedInventory) {
        return inventoryService.updateInventory(inventoryId, updatedInventory);
    }

    @DeleteMapping("/{inventoryId}")
    public void deleteInventory(@PathVariable Long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
    }

    @GetMapping("/{companyId}")
    public List<Inventory> getInventories(@PathVariable Long companyId) {
        return inventoryService.getInventories(companyId);
    }

    @GetMapping("/{companyId}/search")
    public List<Inventory> searchInventoryByProductName(@PathVariable Long companyId, @RequestParam String productName) {
        return inventoryService.searchInventoryByProductName(companyId, productName);
    }

    @GetMapping("/{companyId}/out-of-stock")
    public List<Inventory> getOutOfStockInventories(@PathVariable Long companyId) {
        return inventoryService.getOutOfStockInventories(companyId);
    }
}
