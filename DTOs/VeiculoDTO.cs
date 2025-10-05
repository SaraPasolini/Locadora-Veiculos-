namespace VendaVeiculosApi.DTOs;

public class VeiculoDTO
{
    public int Id { get; set; }
    public string Modelo { get; set; } = string.Empty;
    public string Placa { get; set; } = string.Empty;
    public string Cor { get; set; } = string.Empty;
    public int Ano { get; set; }
    public int Quilometragem { get; set; }
    public decimal Preco { get; set; }
    public int FabricanteId { get; set; }
}
