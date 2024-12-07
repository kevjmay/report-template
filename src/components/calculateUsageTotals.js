export function calculateUsageTotals(csv) {
  let sumElectricUsage = 0;
  let sumElectricAllowance = 0;
  let sumGasUsage = 0;
  let sumGasAllowance = 0;

  csv.forEach((row) => {
    sumElectricUsage += parseFloat(row.electricUsage) || 0;
    sumElectricAllowance += parseFloat(row.electricAllowance) || 0;
    sumGasUsage += parseFloat(row.gasUsage) || 0;
    sumGasAllowance += parseFloat(row.gasAllowance) || 0;
  });

  return {
    electricUsage: sumElectricUsage,
    electricAllowance: sumElectricAllowance,
    gasUsage: sumGasUsage,
    gasAllowance: sumGasAllowance,
  };
}