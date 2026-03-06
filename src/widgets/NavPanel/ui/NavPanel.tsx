"use client";
import { navPanelMock } from "../utils/mock";
import { NavLink } from "@/shared/ui/NavLink/NavLink";
import Image from "next/image";
import "./NavPanel.style.css";
import { useState } from "react";

export function NavPanel() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className={`sidebar-header ${collapsed ? 'sidebar-header-collapsed' : ''}`}>
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          <span className="h-px w-[23px] bg-accent"></span>
          <span className="h-px w-[23px] bg-accent"></span>
          <span className="h-px w-[23px] bg-accent"></span>
        </button>
        <Image
          src="/icons/logo.png"
          alt="Логотип"
          width={72}
          height={28}
        />
      </div>
      <nav className="sidebar-nav">
        <ul className={`sidebar-list ${collapsed ? 'sidebar-list-collapsed' : ''}`}>
          {navPanelMock.map((item) => (
            <li key={item.href}>
              <NavLink 
                href={item.href}
                icon={item.icon}
                size={collapsed ? 'sm' : 'lg'}
              >
                {!collapsed && item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}