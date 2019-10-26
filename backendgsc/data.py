import graphene

class gammaEvents(graphene.ObjectType):
    # id = graphene.ID()
    # name = graphene.String()
    # age = graphene.Int()
    date = graphene.String()
    category = graphene.String()
    ResName = graphene.String()
    SubCategory = graphene.String()
    SourceResViews = graphene.String()
    ResDate = graphene.String()
    StartTime = graphene.String()
    EndTime = graphene.String()
    Available = graphene.String()
    TotalBooked = graphene.String()
    Capacity = graphene.String()
    Description = graphene.String()
    Area = graphene.String()
    RunningTime = graphene.String()
    Age = graphene.String()
    ShowType = graphene.String()
    FilmCertification = graphene.String()
    Price = graphene.String()
    InformationPage = graphene.String()
    GammaResponseType = graphene.String()
    ResID = graphene.String()
    ProductMapID = graphene.String()
    lastSync = graphene.String()
def __repr__(self):
    print(str(self.TotalBooked))
    #return "<__main__.Camera: distance = " + str(self.distance) + "; speed_limit = " + str(self.speed_limit) + "; number_of_cars = " + str(self.number_of_cars) + ">"

class Query(graphene.ObjectType):
    #print("I am in the Query Class")
    event = graphene.Field(gammaEvents)
    #print(event)
    gE = gammaEvents(date = "2019-10-26", category = "Public")


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
    __repr__(result.data["gammaEvents"])
    #print(result.data["event"])
