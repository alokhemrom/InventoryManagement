package com.telusko.SecurityEx.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telusko.SecurityEx.model.Company;
import com.telusko.SecurityEx.model.Inventory;

import java.util.List;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Long> {
    List<Inventory> findByCompany(Company company);
    List<Inventory> findByCompanyAndProductNameContaining(Company company, String productName);
    List<Inventory> findByCompanyAndQtyInStock(Company company, int qtyInStock);
}
