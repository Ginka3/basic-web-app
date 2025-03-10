export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "jjshen";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "jjshen";
  }

  const numberMatch = query.match(/(\d+)/g);
  if (query.toLowerCase().includes("largest") && numberMatch) {
    const numbers = numberMatch.map(Number);
    const largest = Math.max(...numbers);
    return `${largest}`;
  }

  const multiAdditionMatch = query.match(/(\d+)\s+plus\s+(\d+)(?:\s+plus\s+(\d+))?/i);
  if (multiAdditionMatch) {
    const sum = multiAdditionMatch
      .slice(1)
      .filter(n => n)
      .map(Number)
      .reduce((acc, num) => acc + num, 0);
      
    return `${sum}`;
  }

  const additionMatch = query.match(/(\d+)\s+plus\s+(\d+)/i);
  if (additionMatch) {
    const sum = Number(additionMatch[1]) + Number(additionMatch[2]);
    return `${sum}`;
  }

  const multiplicationMatch = query.match(/(\d+)\s+multiplied\s+by\s+(\d+)/i);
  if (multiplicationMatch) {
    const product = Number(multiplicationMatch[1]) * Number(multiplicationMatch[2]);
    return `${product}`;
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    if (numberMatch) {
      const numbers = numberMatch.map(Number);
      for (const num of numbers) {
        const root = Math.round(Math.pow(num, 1 / 6));
        if (Math.pow(root, 6) === num) {
          return `${num}`;
        }
      }
      return "None of the given numbers are both squares and cubes.";
    }
  }

  if (query.toLowerCase().includes("which of the following numbers are primes")) {
    if (numberMatch) {
      const numbers = numberMatch.map(Number);
      const isPrime = (num: number) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };

      const primes = numbers.filter(isPrime);
      if (primes.length > 0) {
        return `${primes.join(", ")}`;
      } else {
        return "None of the given numbers are prime.";
      }
    }
  }

  const subtractionMatch = query.match(/(\d+)\s+minus\s+(\d+)/i);
  if (subtractionMatch) {
    const difference = Number(subtractionMatch[1]) - Number(subtractionMatch[2]);
    return `${difference}`;
  }


  // Handle exponentiation queries with "to the power of"
  const exponentiationMatch = query.match(/(\d+)\s+to\s+the\s+power\s+of\s+(\d+)/i);
  if (exponentiationMatch) {
    const base = BigInt(exponentiationMatch[1]);
    const exponent = BigInt(exponentiationMatch[2]);

    // Compute power manually for large numbers using a loop-based approach
    let result = BigInt(1);
    for (let i = BigInt(0); i < exponent; i++) {
      result *= base;
    }

    return result.toString(); // Convert BigInt result to string for safe output
  }


  return "";
}
