package com.telusko.SecurityEx.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.telusko.SecurityEx.exception.ResourceNotFoundException;
import com.telusko.SecurityEx.model.Company;
import com.telusko.SecurityEx.model.Inventory;
import com.telusko.SecurityEx.model.Users;
import com.telusko.SecurityEx.repo.CompanyRepo;
import com.telusko.SecurityEx.repo.InventoryRepo;
import com.telusko.SecurityEx.repo.UserRepo;

import java.util.List;

@Service
public class InventoryService{

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private CompanyRepo companyRepo;

    @Autowired
    private UserRepo userRepo;

    @Transactional
    public Inventory addInventory(Long companyId, Inventory inventory) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        Company company = companyRepo.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        if (user.getRole().equals("ADMIN") || user.getCompany().getId().equals(companyId)) {
            inventory.setCompany(company);
            return inventoryRepo.save(inventory);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }

    @Transactional
    public Inventory updateInventory(Long inventoryId, Inventory updatedInventory) {
        Inventory inventory = inventoryRepo.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        if (user.getRole().equals("ADMIN") || inventory.getCompany().getId().equals(user.getCompany().getId())) {

            if (updatedInventory.getProductName() != null) {
                inventory.setProductName(updatedInventory.getProductName());
            }
            if (updatedInventory.getDescription() != null) {
                inventory.setDescription(updatedInventory.getDescription());
            }
            if (updatedInventory.getQtyInStock() != null) {
                inventory.setQtyInStock(updatedInventory.getQtyInStock());
            }
            if (updatedInventory.getPrice() != 0) {
                inventory.setPrice(updatedInventory.getPrice());
            }
            return inventoryRepo.save(inventory);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }

    public void deleteInventory(Long inventoryId) {
        Inventory inventory = inventoryRepo.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        if (user.getRole().equals("ADMIN") || inventory.getCompany().getId().equals(user.getCompany().getId())) {
            inventoryRepo.delete(inventory);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }

    public List<Inventory> getInventories(Long companyId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        if (user.getRole().equals("ADMIN") || user.getCompany().getId().equals(companyId)) {
            Company company = companyRepo.findById(companyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            return inventoryRepo.findByCompany(company);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }

    public List<Inventory> searchInventoryByProductName(Long companyId, String productName) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        if (user.getRole().equals("ADMIN") || user.getCompany().getId().equals(companyId)) {
            Company company = companyRepo.findById(companyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            return inventoryRepo.findByCompanyAndProductNameContaining(company, productName);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }

    public List<Inventory> getOutOfStockInventories(Long companyId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username);

        if (user.getRole().equals("ADMIN") || user.getCompany().getId().equals(companyId)) {
            Company company = companyRepo.findById(companyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            return inventoryRepo.findByCompanyAndQtyInStock(company, 0);
        } else {
            throw new AccessDeniedException("Unauthorized access");
        }
    }
}
