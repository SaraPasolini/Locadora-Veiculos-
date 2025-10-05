# VendaVeiculosApi

Projeto exemplo de backend para um sistema de locadora/venda de veículos.
Feito para .NET 9 + EF Core + SQL Server Express + Swagger + AutoMapper.

## Requisitos
- .NET 9 SDK instalado
- SQL Server Express (instância default: .\SQLEXPRESS)
- (Opcional) Visual Studio Code

## Como usar

1. Abra a pasta `VendaVeiculosApi` no VS Code.
2. No terminal, execute:
   ```
   dotnet restore
   dotnet tool install --global dotnet-ef --version 9.0.9
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   dotnet run
   ```
3. O Swagger ficará disponível em: `https://localhost:7243` (ou `http://localhost:5243`)

### Observações
- Se já existir um banco com o mesmo nome, você pode removê-lo pelo SQL Server Management Studio ou executar `dotnet ef database drop`.
- Se ocorrer erro de versão de pacotes, veja o `.csproj` e instale as versões recomendadas no README.

