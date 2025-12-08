import React, { useContext, useId } from "react";
import { ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend } from "recharts";
import "./chart.css";

// Chart context
const ChartContext = React.createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a ChartContainer");
  return context;
}

// ChartContainer
const ChartContainer = React.forwardRef(({ id, className = "", config = {}, children, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={`chart-container ${className}`}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// ChartStyle
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries({ light: "", dark: ".dark" }).map(([theme, prefix]) => {
          return `${prefix} [data-chart=${id}] {
${colorConfig.map(([key, item]) => {
            const color = item.theme?.[theme] || item.color;
            return color ? `  --color-${key}: ${color};` : "";
          }).join("\n")}
}`;
        }).join("\n")
      }}
    />
  );
};

// ChartTooltipContent
const ChartTooltipContent = React.forwardRef(
  ({ active, payload, hideLabel = false, hideIndicator = false, indicator = "dot", labelKey, nameKey }, ref) => {
    const { config } = useChart();
    if (!active || !payload?.length) return null;

    return (
      <div ref={ref} className="chart-tooltip">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = config[key] || {};
          const indicatorColor = item.color || item.payload?.fill || "black";

          return (
            <div key={index} className="chart-tooltip-item">
              {!hideIndicator && (
                <div
                  className="chart-tooltip-indicator-dot"
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <span>{itemConfig.label || item.name}</span>
              {item.value !== undefined && <span>{item.value.toLocaleString()}</span>}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

// ChartLegendContent
const ChartLegendContent = React.forwardRef(
  ({ payload = [], hideIcon = false, verticalAlign = "bottom", nameKey, className = "", ...props }, ref) => {
    const { config } = useChart();
    if (!payload.length) return null;

    return (
      <div ref={ref} className={`chart-legend ${verticalAlign === "top" ? "pb-3" : "pt-3"} ${className}`} {...props}>
        {payload.map((item, index) => {
          const key = nameKey || item.dataKey || "value";
          const itemConfig = config[key] || {};
          const color = item.color || "black";

          return (
            <div key={index} className="chart-legend-item">
              {!hideIcon && <div className="chart-legend-color" style={{ backgroundColor: color }} />}
              {itemConfig.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

// Export
const ChartTooltip = RechartsTooltip;
const ChartLegend = RechartsLegend;

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
