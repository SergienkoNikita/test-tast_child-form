export const userDataAdapter = {
  toClient (data) {
    return {
      name: data.name.value,
      age: data.age.value,
      children: data.children.map((child) => {
        return {
          id: child.id,
          name: child.name.value,
          age: child.age.value,
        }
      }),
    }
  },

  toForm (data) {
    return {
      personData: {
        name: {
          value: data.name,
          valid: true,
        },
        age: {
          value: data.age,
          valid: true,
        },
      },
      personChildren: data.children.map((child) => {
        return {
          id: child.id,
          name: {
            value: child.name,
            valid: true,
          },
          age: {
            value: child.age,
            valid: true,
          },
        }
      }),
    }
  },
}
