import * as XLSX from 'xlsx';

export const parseXLSX = async (file: File) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
  });
  return jsonData;
};
