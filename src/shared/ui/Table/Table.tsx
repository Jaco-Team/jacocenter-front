'use client';
import { Grid, useGridRef, type CellComponentProps } from 'react-window';
import React, { useEffect, useState } from 'react';
import './Table.style.css';
import { CellProps, TableProps } from './Table.types';
import { Text } from '../Typography/Typography';

export function CellComponent<T>({
  columnIndex, rowIndex, style, data, columns, hoveredRow, setHoveredRow, 
  pressedRow, setPressedRow, activeRow, setActiveRow, variant, fontVariant, rowGap
}: CellComponentProps<CellProps<T>>) {
  
  if (rowIndex === 0) {
    return <div style={style} className='pointer-events-none' />;
  }

  const dataIndex = rowIndex - 1;
  const row = data[dataIndex];
  const column = columns[columnIndex];

  if (!row) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (row as any)[column.key];
  const content = column.render ? column.render(value, row) : value;

  const isHovered = hoveredRow === rowIndex;
  const isPressed = pressedRow === rowIndex;
  const isActive = activeRow === rowIndex;
  const isClickable = !!column.onCellClick;
  const textColor = fontVariant === 'label-s-regular-12' ? 'text-text-base' : 'text-text-secondary';

  return (
     <div
      style={{...style, borderTopWidth: rowIndex === 0 ? 0: rowGap}}
      className={`
        table-cell
        ${variant === 'secondary' ? 'table-cell-secondary' : 'table-cell-default'}
        ${isClickable ? 'table-cell-clickable' : ''}
        ${isHovered ? 'table-cell-hovered' : ''}
        ${isPressed ? 'table-cell-pressed' : ''}
        ${isActive ? 'table-cell-active' : ''}
      `}
      onMouseEnter={() => setHoveredRow(rowIndex)}
      onMouseLeave={() => setHoveredRow(null)}
      onMouseDown={() => setPressedRow(rowIndex)}
      onMouseUp={() => setPressedRow(null)}
      onClick={() => {
        setActiveRow(rowIndex);
        column.onCellClick?.(row);
      }}
    >
      {typeof content !== 'object' && content !== null ? <Text variant={fontVariant} className={textColor}>{content}</Text> : content}
    </div>
  );
}

export function Table<T>({
  data, 
  columns, 
  height, 
  width = '100%',
  rowHeight = 56, 
  headerHeight = 52,
  variant = 'default', 
  fontVariant = 'body-m-regular-16',
  rowGap = 0,
  foundRow = null,
}: TableProps<T>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [pressedRow, setPressedRow] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const gridRef = useGridRef(null);

  useEffect(() => {
    if (foundRow !== null && gridRef.current) {   
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveRow(foundRow + 1);   
      gridRef.current.scrollToRow({
        index: foundRow + 1,
        align: 'smart',
        behavior: 'auto'
      });
    }
  }, [foundRow, gridRef]); 

  const getHeaderFont = (columnKey: string, isHeaderActive?: boolean) => {
    if ((isHeaderActive ?? activeColumn === columnKey) && fontVariant === 'label-s-regular-12') {
      return 'label-s-semibold-12';
    }
    return fontVariant;
  };

  const getRowHeight = (index: number) => {
    return index === 0 ? headerHeight : rowHeight + rowGap;
  };

  const resolvedWidth = typeof width === 'number' ? width : containerWidth;
  const minTotalWidth = columns.reduce((sum, column) => sum + column.width, 0);
  const isFlex = minTotalWidth < resolvedWidth;
  const flexMultiplier = isFlex ? resolvedWidth / minTotalWidth : 1;
  const columnWidth = (index: number) => Math.floor(columns[index].width * flexMultiplier);
  const actualContentWidth = isFlex ? resolvedWidth : minTotalWidth;

  return (
      <Grid 
        gridRef={gridRef}
        onResize={({ width: w }) => {
          if (typeof width !== 'number' && w > 0) setContainerWidth(w);
        }}
        cellComponent={CellComponent}
        cellProps={{ data, columns, hoveredRow, setHoveredRow, pressedRow, setPressedRow, activeRow, setActiveRow, variant, fontVariant, rowGap}}
        columnCount={columns.length}
        columnWidth={columnWidth}
        rowCount={(data?.length + 1)}
        rowHeight={getRowHeight}
        overscanCount={10}
        style={{ width, height }}
        className={`table-main ${variant==='secondary' ? 'table-secondary' : ''}`}
      >
        <div className='table-header-wrapper'>
          <div
            className={`table-header ${variant==="secondary" ? 'table-header-secondary' : 'table-header-default'}`}
            style={{ 
              width: actualContentWidth, 
              height: headerHeight
            }}
          >
            {columns.map((column, i) => (
              <div
                key={String(column.key) + i}
                className={`table-header-cell 
                ${(column.isHeaderActive ?? activeColumn === column.key) && variant === "default" ? 'table-header-cell-active-default' : ''}
                ${column.onHeaderClick ? 'table-cell-clickable' : ''}
                `}
                style={{ width: columnWidth(i), flexShrink: 0 }}
                onClick={() => {
                  if (!column.onHeaderClick) return;
                  setActiveColumn(prev => (prev === column.key ? null : column.key));
                  column.onHeaderClick?.(column);
                }}
              >
                  {column.headerRender ? column.headerRender(column) : <Text variant={getHeaderFont(column.key, column.isHeaderActive)}>{column.title}</Text>}
              </div>
            ))}
          </div>
        </div>
      </Grid>
  );
}
