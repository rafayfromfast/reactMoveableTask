export const fetchDiagrams = async () => {
  try {
    const response = await fetch('http://localhost:4000/diagrams');
    if (!response.ok) {
      throw new Error('Failed to fetch diagrams');
    }
    const data = await response.json();
    return data.map((el) => ({ id: el.id, name: el.name }));
  } catch (error) {
    console.error('Error fetching diagrams:', error);
  }
};

export const fetchDiagram = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/diagrams/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch diagram');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching diagram:', error);
  }
};
