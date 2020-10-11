import graphene
from items.models import Instrument
from graphene_django.types import DjangoObjectType

class InstrumentType(DjangoObjectType):
    class Meta:
        model = Instrument
        convert_choices_to_enum = False

class Query(graphene.ObjectType):
    instrument_list = graphene.List(InstrumentType)
    disc = graphene.List(InstrumentType)
    instrument_list_type = graphene.List(InstrumentType, inst=graphene.String())

    def resolve_instrument_list(self, info):
        return Instrument.objects.all()
    
    def resolve_disc(self, info):
        instrument_queryset = Instrument.objects.filter(discount__isnull=False)
        return instrument_queryset

    def resolve_instrument_list_type(self, info, inst):
        instrument_queryset = Instrument.objects.filter(inst_type=inst)
        return instrument_queryset

schema = graphene.Schema(query=Query)
