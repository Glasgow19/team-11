import requests
from datetime import datetime

headers = {"Authorization": "Bearer YOUR API KEY"}


def run_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    request = requests.post('https://gammaql.gsc.org.uk/', json={'query': query}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


# The GraphQL query (with a few aditional bits included) itself defined as a multi-line string.
query = """
{
    gammaEvents{
        ResName
        Category
        SubCategory
        SourceResViews
        ResDate
        StartTime
        EndTime
        Available
        TotalBooked
        Capacity
        Description
        Area
        RunningTime
        Age
        ShowType
        FilmCertification
        Price
        InformationPage
        GammaResponseType
        ResID
        ProductMapID
        lastSync
      }
    }
"""

result = run_query(query) # Execute the query
list = result["data"]["gammaEvents"]
today = datetime.date(datetime.now())
location = "Planetarium"
for event in list:
    if (event["ResDate"] == str(today) and event["Category"] == "Public" and event["Area"] == location):
        print(event["ResName"])
