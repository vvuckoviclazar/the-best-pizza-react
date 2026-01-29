class ValidationError extends Error {
  isValidationError = true;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

type CreateOrderInput = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: any[];
};

export async function createOrder(order: CreateOrderInput) {
  const res = await fetch(
    "https://react-fast-pizza-api.onrender.com/api/order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ValidationError(data.message);
  }

  return data.data;
}

// 👇 export class so it can be used with instanceof
export { ValidationError };

// napravi klasu validationError, ta klasa treba da ekstenda error klasu
// ona samo treba da ima jos jedno polje isValidationError i da bude true
// u createOrder ako response nije ok bacis new ValidationError
// tamo gde pozivam createOrder mozes da proveris je li error instanca klasa ValidationError#
// ako jeste setFormError(err.message) ako nije "Upps..."
// kako tece data flow ovdeo
// how to extend a Class in JavaScript
