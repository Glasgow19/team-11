import graphene

class gammaEvents(graphene.ObjectType):
    # id = graphene.ID()
    # name = graphene.String()
    # age = graphene.Int()
    date = graphene.String()
    category = graphene.String()


class Query(graphene.ObjectType):
    #print("I am in the Query Class")
    event = graphene.Field(gammaEvents)
    #print(event)
    gE = gammaEvents(date = "2019-10-26", category = "Public")
    print(str(gE))
    def resolve_event(self, info):
        print("I am in the resolve_event")
        return gammaEvents(date = "2019-10-26", category = "Public")

    # hello = graphene.String(description='A typical hello world')
    #
    # def resolve_hello(self, info):
    #     return 'World'


schema = graphene.Schema(query=Query)
query = """
    query getTodayEvents{
        gammaEvents{
            ResName
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


# def test_query():
#     result = schema.execute(query)
#     assert not result.errors
#     assert result.data == {"event": {"id": "1", "name": "Syrus", "age": 27}}


if __name__ == "__main__":
    result = schema.execute(query)
    print(result.data["event"])
