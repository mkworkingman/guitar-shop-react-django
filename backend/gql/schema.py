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
    # filtered = graphene.List(
    #     InstrumentType,
    #     strings=graphene.List(graphene.Int),
    #     frets=graphene.List(graphene.Int),
    #     brand=graphene.List(graphene.String),
    #     orientation=graphene.List(graphene.String),
    # )

    def resolve_instrument_list(self, info):
        return Instrument.objects.all()
    
    def resolve_disc(self, info):
        instrument_queryset = Instrument.objects.filter(discount__isnull=False)
        return instrument_queryset

    def resolve_instrument_list_type(self, info, inst):
        instrument_queryset = Instrument.objects.filter(inst_type=inst)
        return instrument_queryset

    # def resolve_filtered(self, info, strings, frets, brand, orientation):
    #     def set_if_not_none(mapping, key, value):
    #         if value != []:
    #             mapping[key] = value

    #     sort_params = {}

    #     set_if_not_none(sort_params, 'strings__in', strings)
    #     set_if_not_none(sort_params, 'frets__in', frets)
    #     set_if_not_none(sort_params, 'brand__in', brand)
    #     set_if_not_none(sort_params, 'orientation__in', orientation)

    #     print(sort_params)

    #     instrument_queryset = Instrument.objects.filter(**sort_params)
    #     return instrument_queryset

schema = graphene.Schema(query=Query)
