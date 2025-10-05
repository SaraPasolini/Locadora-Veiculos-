using AutoMapper;
using VendaVeiculosApi.Models;
using VendaVeiculosApi.DTOs;

namespace VendaVeiculosApi.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Cliente, ClienteDTO>().ReverseMap();
        CreateMap<Fabricante, FabricanteDTO>().ReverseMap();
        CreateMap<Veiculo, VeiculoDTO>().ReverseMap();
        CreateMap<Aluguel, AluguelDTO>().ReverseMap();
        CreateMap<Pagamento, PagamentoDTO>().ReverseMap();
    }
}
