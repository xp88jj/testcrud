import json
from random import randint, choice
from datetime import datetime, timedelta

# Function to generate random dates
def random_date(start, end):
    """Generate a random date between start and end."""
    delta = end - start
    random_days = randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime("%Y-%m-%d")

# Function to generate random names
def random_name():
    first_names = ["John", "Jane", "Smith", "Doe", "Alice", "Bob", "Charlie", "Eve"]
    last_names = ["Anderson", "Brown", "Clark", "Davis", "Evans", "Jones", "Miller", "Taylor"]
    return f"{choice(first_names)} {choice(last_names)}"

# Generate the data
data = {"letters": {}}
start_date = datetime(1990, 1, 1)
end_date = datetime(2020, 12, 31)

for i in range(1, 1001):  # Generate 1000 entries
    sender = random_name()
    receiver = random_name()
    while receiver == sender:  # Ensure sender and receiver are not the same
        receiver = random_name()
    
    data["letters"][str(i)] = {
        "date": random_date(start_date, end_date),
        "sender": sender,
        "receiver": receiver,
        "notes": f"This is note {i}, describing some event or detail."
    }

# Save to a JSON file
output_file = "test_data.json"
with open(output_file, "w") as file:
    json.dump(data, file, indent=4)

print(f"JSON data with 1000 entries saved to {output_file}.")
